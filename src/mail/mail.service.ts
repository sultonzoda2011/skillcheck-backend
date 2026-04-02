import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private readonly APP_NAME = 'SkillCheck';
  private readonly APP_FIRST_NAME = 'Skill';
  private readonly APP_LAST_NAME = 'Check';

  private readonly APP_URL = 'https://skillcheck.kavsaracademy.tj';
  private readonly APP_EMAIL = 'noreply@skillcheck.kavsaracademy.tj';
  private readonly SUPPORT_EMAIL = 'support@skillcheck.kavsaracademy.tj';

  constructor(private readonly mailerService: MailerService) {}

  // ═══════════════════════════════════════════════════════════════════════════
  // Brand Colors (from Tailwind theme)
  // ═══════════════════════════════════════════════════════════════════════════
  private readonly COLORS = {
    primary: '#F54900',
    primaryLight: '#FF6B2C',
    primary2: '#00CDB8',
    primary2Light: '#2EE6D0',
    primary3: '#A855F7',
    primary3Light: '#C084FC',
    bgDark: '#0E0E1A',
    bgCard: '#181828',
    bgCardLight: '#1E1E32',
    bgCardBorder: '#2A2A42',
    textWhite: '#FAFAFA',
    textMuted: '#9CA3AF',
    textDim: '#4B5563',
    success: '#10B981',
    successLight: '#34D399',
    warning: '#F59E0B',
    warningLight: '#FBBF24',
    destructive: '#EF4444',
    destructiveLight: '#F87171',
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // SVG Assets
  // ═══════════════════════════════════════════════════════════════════════════

  /** Top decorative SVG banner (full-width, с логотипом, названием и description) */
  private getSvgHeader(): string {
    const c = this.COLORS;
    return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td>
          <!-- SVG Header Banner — теперь full-width -->
          <div style="border-radius: 20px 20px 0 0; overflow: hidden; line-height: 0;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 160" width="100%" style="display:block;max-width:100%;height:auto">
              <defs>
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:${c.bgDark};stop-opacity:1"/>
                  <stop offset="100%" style="stop-color:#141428;stop-opacity:1"/>
                </linearGradient>
                <linearGradient id="orangeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:${c.primary};stop-opacity:0.6"/>
                  <stop offset="100%" style="stop-color:${c.primaryLight};stop-opacity:0"/>
                </linearGradient>
                <linearGradient id="tealGlow" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:${c.primary2};stop-opacity:0.4"/>
                  <stop offset="100%" style="stop-color:${c.primary2};stop-opacity:0"/>
                </linearGradient>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:${c.primary};stop-opacity:0"/>
                  <stop offset="40%" style="stop-color:${c.primary};stop-opacity:0.8"/>
                  <stop offset="60%" style="stop-color:${c.primary2};stop-opacity:0.8"/>
                  <stop offset="100%" style="stop-color:${c.primary2};stop-opacity:0"/>
                </linearGradient>
                <radialGradient id="orangeBlob" cx="25%" cy="40%" r="40%">
                  <stop offset="0%" style="stop-color:${c.primary};stop-opacity:0.18"/>
                  <stop offset="100%" style="stop-color:${c.primary};stop-opacity:0"/>
                </radialGradient>
                <radialGradient id="tealBlob" cx="75%" cy="60%" r="40%">
                  <stop offset="0%" style="stop-color:${c.primary2};stop-opacity:0.14"/>
                  <stop offset="100%" style="stop-color:${c.primary2};stop-opacity:0"/>
                </radialGradient>
              </defs>

              <!-- Base background -->
              <rect width="600" height="160" fill="url(#bgGrad)"/>

              <!-- Ambient blobs -->
              <rect width="600" height="160" fill="url(#orangeBlob)"/>
              <rect width="600" height="160" fill="url(#tealBlob)"/>

              <!-- Grid dots -->
              ${Array.from({ length: 13 }, (_, col) =>
                Array.from(
                  { length: 5 },
                  (_, row) =>
                    `<circle cx="${col * 50 + 25}" cy="${row * 36 + 16}" r="1" fill="${c.primary2}" opacity="0.12"/>`,
                ).join(''),
              ).join('')}

              <!-- Circuit lines left side -->
              <polyline points="20,40 60,40 60,80 100,80" stroke="${c.primary}" stroke-width="1" fill="none" opacity="0.25"/>
              <polyline points="20,100 45,100 45,60 80,60" stroke="${c.primary}" stroke-width="1" fill="none" opacity="0.18"/>
              <circle cx="20" cy="40" r="3" fill="${c.primary}" opacity="0.5"/>
              <circle cx="100" cy="80" r="3" fill="${c.primary}" opacity="0.5"/>
              <circle cx="60" cy="40" r="2" fill="${c.primary}" opacity="0.35"/>
              <circle cx="60" cy="80" r="2" fill="${c.primary}" opacity="0.35"/>

              <!-- Circuit lines right side -->
              <polyline points="580,30 540,30 540,70 500,70" stroke="${c.primary2}" stroke-width="1" fill="none" opacity="0.25"/>
              <polyline points="580,110 555,110 555,75 520,75" stroke="${c.primary2}" stroke-width="1" fill="none" opacity="0.18"/>
              <circle cx="580" cy="30" r="3" fill="${c.primary2}" opacity="0.5"/>
              <circle cx="500" cy="70" r="3" fill="${c.primary2}" opacity="0.5"/>
              <circle cx="540" cy="30" r="2" fill="${c.primary2}" opacity="0.35"/>
              <circle cx="540" cy="70" r="2" fill="${c.primary2}" opacity="0.35"/>

              <!-- Decorative diagonal lines -->
              <line x1="420" y1="0" x2="600" y2="0" stroke="${c.primary2}" stroke-width="1" opacity="0.12"/>
              <line x1="460" y1="0" x2="600" y2="20" stroke="${c.primary2}" stroke-width="0.5" opacity="0.08"/>
              <line x1="0" y1="140" x2="180" y2="160" stroke="${c.primary}" stroke-width="0.5" opacity="0.08"/>

              <!-- Lightning bolt icon (лого) -->
              <g transform="translate(280, 28)">
                <circle cx="20" cy="20" r="22" fill="${c.primary}" opacity="0.08"/>
                <circle cx="20" cy="20" r="17" fill="${c.primary}" opacity="0.1"/>
                <polygon points="23,4 12,22 20,22 17,36 28,18 20,18" fill="${c.primary}" opacity="0.95"/>
                <polygon points="23,4 12,22 20,22 17,36 28,18 20,18" fill="url(#orangeGlow)" opacity="0.5"/>
              </g>

              <!-- App Name -->
              <text x="300" y="96" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-size="32" font-weight="900" fill="${c.primary}" letter-spacing="-1">${this.APP_FIRST_NAME}</text>
              <text x="300" y="96" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-size="32" font-weight="900" fill="${c.primary2}" letter-spacing="-1" dx="68">${this.APP_LAST_NAME}</text>

              <!-- Description / Tagline -->
              <text x="300" y="118" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-size="11" fill="${c.textMuted}" letter-spacing="3" opacity="0.75">AI-POWERED SKILL ASSESSMENT</text>

              <!-- Bottom separator line -->
              <rect x="0" y="155" width="600" height="1" fill="url(#lineGrad)"/>

              <!-- Accent dots -->
              <circle cx="180" cy="155.5" r="2" fill="${c.primary}" opacity="0.8"/>
              <circle cx="300" cy="155.5" r="2.5" fill="${c.primary}" opacity="1"/>
              <circle cx="420" cy="155.5" r="2" fill="${c.primary2}" opacity="0.8"/>
            </svg>
          </div>
        </td>
      </tr>
    </table>`;
  }

  /** Decorative SVG divider between sections */
  private getSvgDivider(color1: string, color2: string): string {
    return `
    <div style="margin: 28px 0; line-height: 0;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 8" width="520" style="display:block;max-width:100%;margin:0 auto">
        <defs>
          <linearGradient id="divGrad${color1.replace('#', '')}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:transparent"/>
            <stop offset="30%" style="stop-color:${color1};stop-opacity:0.6"/>
            <stop offset="50%" style="stop-color:${color2};stop-opacity:0.8"/>
            <stop offset="70%" style="stop-color:${color1};stop-opacity:0.6"/>
            <stop offset="100%" style="stop-color:transparent"/>
          </linearGradient>
        </defs>
        <rect x="0" y="3" width="520" height="1" fill="url(#divGrad${color1.replace('#', '')})"/>
        <circle cx="260" cy="3.5" r="3" fill="${color2}" opacity="0.9"/>
        <circle cx="240" cy="3.5" r="1.5" fill="${color1}" opacity="0.6"/>
        <circle cx="280" cy="3.5" r="1.5" fill="${color1}" opacity="0.6"/>
      </svg>
    </div>`;
  }

  /**
   * Base email template — теперь полностью full-width (без центрального контейнера 600px)
   * Footer полностью удалён
   */
  private getEmailTemplate(content: string): string {
    const c = this.COLORS;
    return `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${this.APP_NAME}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: ${c.bgDark}; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">

      <!-- Full-width outer wrapper -->
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: ${c.bgDark}; min-height: 100vh;">
        <tr>
          <td style="padding: 20px 15px;">

            <!-- Main content block — full width -->
            <div style="background: ${c.bgCard}; border-radius: 20px; border: 1px solid ${c.bgCardBorder}; overflow: hidden; box-shadow: 0 32px 64px -16px rgba(0,0,0,0.7); max-width: 100%; margin: 0 auto;">

              <!-- SVG Header (full-width) -->
              ${this.getSvgHeader()}

              <!-- Content area -->
              <div style="padding: 44px 40px 48px;">
                ${content}
              </div>
            </div>

          </td>
        </tr>
      </table>

    </body>
    </html>`;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Icon SVGs (inline, email-safe)
  // ═══════════════════════════════════════════════════════════════════════════

  private getSvgResetIcon(): string {
    const c = this.COLORS;
    return `
    <div style="margin: 0 auto 28px auto; width: 88px; height: 88px; line-height: 0;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88" width="88" height="88">
        <defs>
          <linearGradient id="rIconBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${c.warning};stop-opacity:1"/>
            <stop offset="100%" style="stop-color:${c.destructive};stop-opacity:1"/>
          </linearGradient>
        </defs>
        <circle cx="44" cy="44" r="43" fill="${c.warning}" opacity="0.1"/>
        <circle cx="44" cy="44" r="35" fill="${c.warning}" opacity="0.06"/>
        <circle cx="44" cy="44" r="28" fill="url(#rIconBg)"/>
        <rect x="30" y="42" width="28" height="20" rx="4" fill="white" opacity="0.95"/>
        <path d="M36,42 L36,34 Q36,26 44,26 Q52,26 52,34 L52,42" stroke="white" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.95"/>
        <circle cx="44" cy="51" r="3.5" fill="url(#rIconBg)"/>
        <rect x="42.5" y="51" width="3" height="6" rx="1" fill="url(#rIconBg)"/>
      </svg>
    </div>`;
  }

  private getSvgSuccessIcon(): string {
    const c = this.COLORS;
    return `
    <div style="margin: 0 auto 28px auto; width: 88px; height: 88px; line-height: 0;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88" width="88" height="88">
        <defs>
          <linearGradient id="sIconBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${c.successLight};stop-opacity:1"/>
            <stop offset="100%" style="stop-color:${c.success};stop-opacity:1"/>
          </linearGradient>
        </defs>
        <circle cx="44" cy="44" r="43" fill="${c.success}" opacity="0.1"/>
        <circle cx="44" cy="44" r="35" fill="${c.success}" opacity="0.08"/>
        <circle cx="44" cy="44" r="28" fill="url(#sIconBg)"/>
        <polyline points="28,44 39,55 60,32" stroke="white" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.97"/>
      </svg>
    </div>`;
  }

  /** Credential row */
  private getCredentialRow(
    label: string,
    value: string,
    isMono = false,
    isLast = false,
  ): string {
    const c = this.COLORS;
    const border = isLast
      ? ''
      : `border-bottom: 1px solid rgba(255,255,255,0.07);`;
    const valStyle = isMono
      ? `font-family: 'Courier New', Courier, monospace; background: rgba(0,0,0,0.35); padding: 6px 12px; border-radius: 8px; display: inline-block; font-size: 15px; color: ${c.textWhite};`
      : `font-size: 16px; color: ${c.textWhite};`;
    return `
      <tr>
        <td style="padding: 14px 0; ${border}">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td width="4" style="padding-right: 14px;">
                <div style="line-height:0;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="4" height="44">
                    <defs>
                      <linearGradient id="accentBar" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:${c.primary};stop-opacity:0.9"/>
                        <stop offset="100%" style="stop-color:${c.primary2};stop-opacity:0.5"/>
                      </linearGradient>
                    </defs>
                    <rect width="4" height="44" rx="2" fill="url(#accentBar)"/>
                  </svg>
                </div>
              </td>
              <td>
                <span style="color: ${c.textMuted}; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">${label}</span>
                <p style="margin: 6px 0 0 0; font-weight: 600; ${valStyle}">${value}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  }

  /** CTA button */
  private getCtaButton(
    href: string,
    label: string,
    color1: string,
    color2: string,
  ): string {
    return `
    <div style="text-align: center; margin: 32px 0;">
      <a href="${href}" style="display: inline-block; text-decoration: none;">
        <table role="presentation" cellspacing="0" cellpadding="0">
          <tr>
            <td style="background: linear-gradient(135deg, ${color1} 0%, ${color2} 100%); border-radius: 14px; padding: 1px;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background: linear-gradient(135deg, ${color1} 0%, ${color2} 100%); border-radius: 13px; padding: 15px 40px;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 10px;">
                          <span style="color: #FFFFFF; font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: 0.3px; white-space: nowrap;">${label}</span>
                        </td>
                        <td style="vertical-align: middle; line-height: 0;">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <polyline points="5,10 15,10" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            <polyline points="11,6 15,10 11,14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                          </svg>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </a>
    </div>`;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Public Mail Methods
  // ═══════════════════════════════════════════════════════════════════════════

  async sendWelcomeEmail(
    email: string,
    fullName: string,
    password: string,
  ): Promise<void> {
    const c = this.COLORS;
    const content = `
      <h2 style="margin: 0 0 8px 0; color: ${c.textWhite}; font-size: 28px; font-weight: 800; text-align: center; letter-spacing: -0.8px;">
        Добро пожаловать в <span style="color: ${c.primary};">${this.APP_FIRST_NAME}</span><span style="color: ${c.primary2};">${this.APP_LAST_NAME}</span>!
      </h2>

      <p style="margin: 0 0 20px 0; color: ${c.textMuted}; font-size: 15px; text-align: center; line-height: 1.6;">
        AI-POWERED SKILL ASSESSMENT<br>
        <strong style="color: ${c.primaryLight};">Мастер своего стека. Вызывай ИИ. Соревнуйся с миром.</strong>
      </p>

      ${this.getSvgDivider(c.primary, c.primary2)}

      <p style="color: ${c.textMuted}; font-size: 14px; line-height: 1.75; text-align: center; margin: 0 0 24px 0;">
        Привет, <strong style="color: ${c.primaryLight};">${fullName}</strong> — твоя учётная запись готова.
      </p>

      <!-- Credentials Card -->
      <div style="background: rgba(245, 73, 0, 0.06); border: 1px solid rgba(245, 73, 0, 0.25); border-radius: 18px; padding: 8px 28px; margin-bottom: 32px; box-shadow: 0 10px 30px -10px rgba(245,73,0,0.3);">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          ${this.getCredentialRow('Email для входа', email, false, false)}
          ${this.getCredentialRow('Пароль', password, true, true)}
        </table>
      </div>

      ${this.getCtaButton(this.APP_URL, 'Войти в SkillCheck', c.primary, c.primaryLight)}

    `;

    await this.mailerService.sendMail({
      to: email,
      from: `${this.APP_NAME} <${this.SUPPORT_EMAIL}>`,
      subject: `⚡ Добро пожаловать в ${this.APP_NAME} — аккаунт готов!`,
      html: this.getEmailTemplate(content),
    });
  }

  async sendPasswordResetEmail(
    email: string,
    fullName: string,
    resetToken: string,
  ): Promise<void> {
    const c = this.COLORS;
    const resetLink = `${this.APP_URL}/reset-password?token=${resetToken}`;

    const content = `
      ${this.getSvgResetIcon()}

      <h2 style="margin: 0 0 10px 0; color: ${c.textWhite}; font-size: 26px; font-weight: 800; text-align: center; letter-spacing: -0.5px;">
        Сброс пароля
      </h2>
      <p style="margin: 0; color: ${c.textMuted}; font-size: 15px; text-align: center;">
        Привет, <strong style="color: ${c.primaryLight};">${fullName}</strong>
      </p>

      ${this.getSvgDivider(c.warning, c.destructive)}

      <p style="color: ${c.textMuted}; font-size: 14px; line-height: 1.75; text-align: center; margin: 0 0 28px 0;">
        Мы получили запрос на сброс пароля. Нажми кнопку ниже, чтобы создать новый пароль.<br>
        <strong style="color: ${c.textWhite};">Ссылка действительна 1 час.</strong>
      </p>

      ${this.getCtaButton(resetLink, 'Сбросить пароль', c.warning, c.destructive)}

      <div style="background: rgba(0, 205, 184, 0.06); border: 1px solid rgba(0, 205, 184, 0.2); border-radius: 14px; padding: 14px 18px; margin: 0 0 20px 0;">
        <p style="margin: 0 0 6px 0; color: ${c.textMuted}; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Или скопируй ссылку</p>
        <p style="margin: 0; color: ${c.primary2}; font-size: 12px; word-break: break-all; font-family: 'Courier New', Courier, monospace; line-height: 1.6;">${resetLink}</p>
      </div>

      `;

    await this.mailerService.sendMail({
      to: email,
      subject: `🔐 ${this.APP_NAME} — Запрос на сброс пароля`,
      html: this.getEmailTemplate(content),
    });
  }

  async sendPasswordChangedEmail(
    email: string,
    fullName: string,
  ): Promise<void> {
    const c = this.COLORS;

    const content = `
      ${this.getSvgSuccessIcon()}

      <h2 style="margin: 0 0 10px 0; color: ${c.textWhite}; font-size: 26px; font-weight: 800; text-align: center; letter-spacing: -0.5px;">
        Пароль изменён!
      </h2>
      <p style="margin: 0; color: ${c.textMuted}; font-size: 15px; text-align: center;">
        Привет, <strong style="color: ${c.primaryLight};">${fullName}</strong>
      </p>

      ${this.getSvgDivider(c.success, c.successLight)}

      <p style="color: ${c.textMuted}; font-size: 14px; line-height: 1.75; text-align: center; margin: 0 0 28px 0;">
        Твой пароль успешно обновлён. Теперь ты можешь войти в аккаунт <strong style="color: ${c.textWhite};">${this.APP_NAME}</strong> с новым паролем.
      </p>

      <div style="text-align: center; margin: 0 0 28px 0; line-height: 0;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 48" width="240" style="display:inline-block">
          <defs>
            <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:${c.success};stop-opacity:0.15"/>
              <stop offset="100%" style="stop-color:${c.successLight};stop-opacity:0.15"/>
            </linearGradient>
          </defs>
          <rect width="240" height="48" rx="24" fill="url(#badgeGrad)" stroke="${c.success}" stroke-width="1" stroke-opacity="0.4"/>
          <path d="M20,8 L28,11 L28,20 Q28,26 20,29 Q12,26 12,20 L12,11 Z" fill="${c.success}" opacity="0.8"/>
          <polyline points="15,19 19,23 25,15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <text x="120" y="29" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-size="14" font-weight="700" fill="${c.successLight}">Аккаунт защищён ✓</text>
        </svg>
      </div>

      ${this.getCtaButton(this.APP_URL, `Перейти в ${this.APP_NAME}`, c.success, c.successLight)}

    `;

    await this.mailerService.sendMail({
      to: email,
      subject: `✅ ${this.APP_NAME} — Пароль успешно изменён`,
      html: this.getEmailTemplate(content),
    });
  }
}
