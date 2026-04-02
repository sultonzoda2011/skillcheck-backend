import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { User } from 'src/generated/prisma/client';
import { CreateReviewDto } from 'src/reviews/dto/create-review.dto';
import { ReviewsService } from './reviews.service';

@ApiTags('Отзывы')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @ApiOperation({
    summary: 'Получить все одобренные отзывы',
    description:
      'Возвращает список всех отзывов, которые прошли модерацию администратором.',
  })
  @ApiOkResponse({ description: 'Список одобренных отзывов успешно получен' })
  async getReviews() {
    return this.reviewsService.getReviews();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  @ApiOperation({
    summary: 'Создать новый отзыв',
    description:
      'Позволяет авторизованному пользователю отправить отзыв о платформе. Отзыв попадет в очередь на модерацию.',
  })
  @ApiCreatedResponse({
    description: 'Отзыв успешно создан и отправлен на модерацию',
  })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  async createReview(@Authorized() user: User, @Body() dto: CreateReviewDto) {
    return this.reviewsService.createReview(dto, user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('/pending')
  @ApiOperation({
    summary: 'Получить список отзывов на модерации',
    description:
      'Возвращает список всех новых отзывов, ожидающих одобрения администратором. Доступно только для ADMIN.',
  })
  @ApiOkResponse({ description: 'Список отзывов на модерации успешно получен' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiForbiddenResponse({ description: 'Недостаточно прав (требуется ADMIN)' })
  async getPendingReviews() {
    return this.reviewsService.getPendingReviews();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('/approve/:id')
  @ApiOperation({
    summary: 'Одобрить отзыв',
    description:
      'Меняет статус отзыва на «одобрен», после чего он становится виден всем пользователям. Доступно только для ADMIN.',
  })
  @ApiOkResponse({ description: 'Отзыв успешно одобрен' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiForbiddenResponse({ description: 'Недостаточно прав (требуется ADMIN)' })
  async approveReview(@Param('id') id: string) {
    return this.reviewsService.approveReview(id);
  }
}
