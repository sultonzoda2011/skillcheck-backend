import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type BestResultModel = runtime.Types.Result.DefaultSelection<Prisma.$BestResultPayload>;
export type AggregateBestResult = {
    _count: BestResultCountAggregateOutputType | null;
    _avg: BestResultAvgAggregateOutputType | null;
    _sum: BestResultSumAggregateOutputType | null;
    _min: BestResultMinAggregateOutputType | null;
    _max: BestResultMaxAggregateOutputType | null;
};
export type BestResultAvgAggregateOutputType = {
    bestFrontendScore: number | null;
    bestBackendScore: number | null;
    bestMobileScore: number | null;
    totalScore: number | null;
};
export type BestResultSumAggregateOutputType = {
    bestFrontendScore: number | null;
    bestBackendScore: number | null;
    bestMobileScore: number | null;
    totalScore: number | null;
};
export type BestResultMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    bestFrontendScore: number | null;
    bestBackendScore: number | null;
    bestMobileScore: number | null;
    totalScore: number | null;
    frontendAchievedAt: Date | null;
    backendAchievedAt: Date | null;
    mobileAchievedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BestResultMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    bestFrontendScore: number | null;
    bestBackendScore: number | null;
    bestMobileScore: number | null;
    totalScore: number | null;
    frontendAchievedAt: Date | null;
    backendAchievedAt: Date | null;
    mobileAchievedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BestResultCountAggregateOutputType = {
    id: number;
    userId: number;
    bestFrontendScore: number;
    bestBackendScore: number;
    bestMobileScore: number;
    totalScore: number;
    frontendAchievedAt: number;
    backendAchievedAt: number;
    mobileAchievedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BestResultAvgAggregateInputType = {
    bestFrontendScore?: true;
    bestBackendScore?: true;
    bestMobileScore?: true;
    totalScore?: true;
};
export type BestResultSumAggregateInputType = {
    bestFrontendScore?: true;
    bestBackendScore?: true;
    bestMobileScore?: true;
    totalScore?: true;
};
export type BestResultMinAggregateInputType = {
    id?: true;
    userId?: true;
    bestFrontendScore?: true;
    bestBackendScore?: true;
    bestMobileScore?: true;
    totalScore?: true;
    frontendAchievedAt?: true;
    backendAchievedAt?: true;
    mobileAchievedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BestResultMaxAggregateInputType = {
    id?: true;
    userId?: true;
    bestFrontendScore?: true;
    bestBackendScore?: true;
    bestMobileScore?: true;
    totalScore?: true;
    frontendAchievedAt?: true;
    backendAchievedAt?: true;
    mobileAchievedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BestResultCountAggregateInputType = {
    id?: true;
    userId?: true;
    bestFrontendScore?: true;
    bestBackendScore?: true;
    bestMobileScore?: true;
    totalScore?: true;
    frontendAchievedAt?: true;
    backendAchievedAt?: true;
    mobileAchievedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BestResultAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BestResultWhereInput;
    orderBy?: Prisma.BestResultOrderByWithRelationInput | Prisma.BestResultOrderByWithRelationInput[];
    cursor?: Prisma.BestResultWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BestResultCountAggregateInputType;
    _avg?: BestResultAvgAggregateInputType;
    _sum?: BestResultSumAggregateInputType;
    _min?: BestResultMinAggregateInputType;
    _max?: BestResultMaxAggregateInputType;
};
export type GetBestResultAggregateType<T extends BestResultAggregateArgs> = {
    [P in keyof T & keyof AggregateBestResult]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBestResult[P]> : Prisma.GetScalarType<T[P], AggregateBestResult[P]>;
};
export type BestResultGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BestResultWhereInput;
    orderBy?: Prisma.BestResultOrderByWithAggregationInput | Prisma.BestResultOrderByWithAggregationInput[];
    by: Prisma.BestResultScalarFieldEnum[] | Prisma.BestResultScalarFieldEnum;
    having?: Prisma.BestResultScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BestResultCountAggregateInputType | true;
    _avg?: BestResultAvgAggregateInputType;
    _sum?: BestResultSumAggregateInputType;
    _min?: BestResultMinAggregateInputType;
    _max?: BestResultMaxAggregateInputType;
};
export type BestResultGroupByOutputType = {
    id: string;
    userId: string;
    bestFrontendScore: number;
    bestBackendScore: number;
    bestMobileScore: number;
    totalScore: number;
    frontendAchievedAt: Date | null;
    backendAchievedAt: Date | null;
    mobileAchievedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: BestResultCountAggregateOutputType | null;
    _avg: BestResultAvgAggregateOutputType | null;
    _sum: BestResultSumAggregateOutputType | null;
    _min: BestResultMinAggregateOutputType | null;
    _max: BestResultMaxAggregateOutputType | null;
};
type GetBestResultGroupByPayload<T extends BestResultGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BestResultGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BestResultGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BestResultGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BestResultGroupByOutputType[P]>;
}>>;
export type BestResultWhereInput = {
    AND?: Prisma.BestResultWhereInput | Prisma.BestResultWhereInput[];
    OR?: Prisma.BestResultWhereInput[];
    NOT?: Prisma.BestResultWhereInput | Prisma.BestResultWhereInput[];
    id?: Prisma.StringFilter<"BestResult"> | string;
    userId?: Prisma.StringFilter<"BestResult"> | string;
    bestFrontendScore?: Prisma.IntFilter<"BestResult"> | number;
    bestBackendScore?: Prisma.IntFilter<"BestResult"> | number;
    bestMobileScore?: Prisma.IntFilter<"BestResult"> | number;
    totalScore?: Prisma.IntFilter<"BestResult"> | number;
    frontendAchievedAt?: Prisma.DateTimeNullableFilter<"BestResult"> | Date | string | null;
    backendAchievedAt?: Prisma.DateTimeNullableFilter<"BestResult"> | Date | string | null;
    mobileAchievedAt?: Prisma.DateTimeNullableFilter<"BestResult"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"BestResult"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BestResult"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type BestResultOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    bestFrontendScore?: Prisma.SortOrder;
    bestBackendScore?: Prisma.SortOrder;
    bestMobileScore?: Prisma.SortOrder;
    totalScore?: Prisma.SortOrder;
    frontendAchievedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    backendAchievedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    mobileAchievedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type BestResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.BestResultWhereInput | Prisma.BestResultWhereInput[];
    OR?: Prisma.BestResultWhereInput[];
    NOT?: Prisma.BestResultWhereInput | Prisma.BestResultWhereInput[];
    bestFrontendScore?: Prisma.IntFilter<"BestResult"> | number;
    bestBackendScore?: Prisma.IntFilter<"BestResult"> | number;
    bestMobileScore?: Prisma.IntFilter<"BestResult"> | number;
    totalScore?: Prisma.IntFilter<"BestResult"> | number;
    frontendAchievedAt?: Prisma.DateTimeNullableFilter<"BestResult"> | Date | string | null;
    backendAchievedAt?: Prisma.DateTimeNullableFilter<"BestResult"> | Date | string | null;
    mobileAchievedAt?: Prisma.DateTimeNullableFilter<"BestResult"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"BestResult"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BestResult"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type BestResultOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    bestFrontendScore?: Prisma.SortOrder;
    bestBackendScore?: Prisma.SortOrder;
    bestMobileScore?: Prisma.SortOrder;
    totalScore?: Prisma.SortOrder;
    frontendAchievedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    backendAchievedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    mobileAchievedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BestResultCountOrderByAggregateInput;
    _avg?: Prisma.BestResultAvgOrderByAggregateInput;
    _max?: Prisma.BestResultMaxOrderByAggregateInput;
    _min?: Prisma.BestResultMinOrderByAggregateInput;
    _sum?: Prisma.BestResultSumOrderByAggregateInput;
};
export type BestResultScalarWhereWithAggregatesInput = {
    AND?: Prisma.BestResultScalarWhereWithAggregatesInput | Prisma.BestResultScalarWhereWithAggregatesInput[];
    OR?: Prisma.BestResultScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BestResultScalarWhereWithAggregatesInput | Prisma.BestResultScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"BestResult"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"BestResult"> | string;
    bestFrontendScore?: Prisma.IntWithAggregatesFilter<"BestResult"> | number;
    bestBackendScore?: Prisma.IntWithAggregatesFilter<"BestResult"> | number;
    bestMobileScore?: Prisma.IntWithAggregatesFilter<"BestResult"> | number;
    totalScore?: Prisma.IntWithAggregatesFilter<"BestResult"> | number;
    frontendAchievedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"BestResult"> | Date | string | null;
    backendAchievedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"BestResult"> | Date | string | null;
    mobileAchievedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"BestResult"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"BestResult"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"BestResult"> | Date | string;
};
export type BestResultCreateInput = {
    id?: string;
    bestFrontendScore?: number;
    bestBackendScore?: number;
    bestMobileScore?: number;
    totalScore?: number;
    frontendAchievedAt?: Date | string | null;
    backendAchievedAt?: Date | string | null;
    mobileAchievedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutBestResultInput;
};
export type BestResultUncheckedCreateInput = {
    id?: string;
    userId: string;
    bestFrontendScore?: number;
    bestBackendScore?: number;
    bestMobileScore?: number;
    totalScore?: number;
    frontendAchievedAt?: Date | string | null;
    backendAchievedAt?: Date | string | null;
    mobileAchievedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BestResultUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bestFrontendScore?: Prisma.IntFieldUpdateOperationsInput | number;
    bestBackendScore?: Prisma.IntFieldUpdateOperationsInput | number;
    bestMobileScore?: Prisma.IntFieldUpdateOperationsInput | number;
    totalScore?: Prisma.IntFieldUpdateOperationsInput | number;
    frontendAchievedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    backendAchievedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    mobileAchievedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutBestResultNestedInput;
};
export type BestResultUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    bestFrontendScore?: Prisma.IntFieldUpdateOperationsInput | number;
    bestBackendScore?: Prisma.IntFieldUpdateOperationsInput | number;
    bestMobileScore?: Prisma.IntFieldUpdateOperationsInput | number;
    totalScore?: Prisma.IntFieldUpdateOperationsInput | number;
    frontendAchievedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    backendAchievedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    mobileAchievedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BestResultCreateManyInput = {
    id?: string;
    userId: string;
    bestFrontendScore?: number;
    bestBackendScore?: number;
    bestMobileScore?: number;
    totalScore?: number;
    frontendAchievedAt?: Date | string | null;
    backendAchievedAt?: Date | string | null;
    mobileAchievedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BestResultUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bestFrontendScore?: Prisma.IntFieldUpdateOperationsInput | number;
    bestBackendScore?: Prisma.IntFieldUpdateOperationsInput | number;
    bestMobileScore?: Prisma.IntFieldUpdateOperationsInput | number;
    totalScore?: Prisma.IntFieldUpdateOperationsInput | number;
    frontendAchievedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    backendAchievedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    mobileAchievedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BestResultUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    bestFrontendScore?: Prisma.IntFieldUpdateOperationsInput | number;
    bestBackendScore?: Prisma.IntFieldUpdateOperationsInput | number;
    bestMobileScore?: Prisma.IntFieldUpdateOperationsInput | number;
    totalScore?: Prisma.IntFieldUpdateOperationsInput | number;
    frontendAchievedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    backendAchievedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    mobileAchievedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BestResultNullableScalarRelationFilter = {
    is?: Prisma.BestResultWhereInput | null;
    isNot?: Prisma.BestResultWhereInput | null;
};
export type BestResultCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    bestFrontendScore?: Prisma.SortOrder;
    bestBackendScore?: Prisma.SortOrder;
    bestMobileScore?: Prisma.SortOrder;
    totalScore?: Prisma.SortOrder;
    frontendAchievedAt?: Prisma.SortOrder;
    backendAchievedAt?: Prisma.SortOrder;
    mobileAchievedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BestResultAvgOrderByAggregateInput = {
    bestFrontendScore?: Prisma.SortOrder;
    bestBackendScore?: Prisma.SortOrder;
    bestMobileScore?: Prisma.SortOrder;
    totalScore?: Prisma.SortOrder;
};
export type BestResultMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    bestFrontendScore?: Prisma.SortOrder;
    bestBackendScore?: Prisma.SortOrder;
    bestMobileScore?: Prisma.SortOrder;
    totalScore?: Prisma.SortOrder;
    frontendAchievedAt?: Prisma.SortOrder;
    backendAchievedAt?: Prisma.SortOrder;
    mobileAchievedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BestResultMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    bestFrontendScore?: Prisma.SortOrder;
    bestBackendScore?: Prisma.SortOrder;
    bestMobileScore?: Prisma.SortOrder;
    totalScore?: Prisma.SortOrder;
    frontendAchievedAt?: Prisma.SortOrder;
    backendAchievedAt?: Prisma.SortOrder;
    mobileAchievedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BestResultSumOrderByAggregateInput = {
    bestFrontendScore?: Prisma.SortOrder;
    bestBackendScore?: Prisma.SortOrder;
    bestMobileScore?: Prisma.SortOrder;
    totalScore?: Prisma.SortOrder;
};
export type BestResultCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.BestResultCreateWithoutUserInput, Prisma.BestResultUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.BestResultCreateOrConnectWithoutUserInput;
    connect?: Prisma.BestResultWhereUniqueInput;
};
export type BestResultUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.BestResultCreateWithoutUserInput, Prisma.BestResultUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.BestResultCreateOrConnectWithoutUserInput;
    connect?: Prisma.BestResultWhereUniqueInput;
};
export type BestResultUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.BestResultCreateWithoutUserInput, Prisma.BestResultUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.BestResultCreateOrConnectWithoutUserInput;
    upsert?: Prisma.BestResultUpsertWithoutUserInput;
    disconnect?: Prisma.BestResultWhereInput | boolean;
    delete?: Prisma.BestResultWhereInput | boolean;
    connect?: Prisma.BestResultWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BestResultUpdateToOneWithWhereWithoutUserInput, Prisma.BestResultUpdateWithoutUserInput>, Prisma.BestResultUncheckedUpdateWithoutUserInput>;
};
export type BestResultUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.BestResultCreateWithoutUserInput, Prisma.BestResultUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.BestResultCreateOrConnectWithoutUserInput;
    upsert?: Prisma.BestResultUpsertWithoutUserInput;
    disconnect?: Prisma.BestResultWhereInput | boolean;
    delete?: Prisma.BestResultWhereInput | boolean;
    connect?: Prisma.BestResultWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BestResultUpdateToOneWithWhereWithoutUserInput, Prisma.BestResultUpdateWithoutUserInput>, Prisma.BestResultUncheckedUpdateWithoutUserInput>;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type BestResultCreateWithoutUserInput = {
    id?: string;
    bestFrontendScore?: number;
    bestBackendScore?: number;
    bestMobileScore?: number;
    totalScore?: number;
    frontendAchievedAt?: Date | string | null;
    backendAchievedAt?: Date | string | null;
    mobileAchievedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BestResultUncheckedCreateWithoutUserInput = {
    id?: string;
    bestFrontendScore?: number;
    bestBackendScore?: number;
    bestMobileScore?: number;
    totalScore?: number;
    frontendAchievedAt?: Date | string | null;
    backendAchievedAt?: Date | string | null;
    mobileAchievedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BestResultCreateOrConnectWithoutUserInput = {
    where: Prisma.BestResultWhereUniqueInput;
    create: Prisma.XOR<Prisma.BestResultCreateWithoutUserInput, Prisma.BestResultUncheckedCreateWithoutUserInput>;
};
export type BestResultUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.BestResultUpdateWithoutUserInput, Prisma.BestResultUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.BestResultCreateWithoutUserInput, Prisma.BestResultUncheckedCreateWithoutUserInput>;
    where?: Prisma.BestResultWhereInput;
};
export type BestResultUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.BestResultWhereInput;
    data: Prisma.XOR<Prisma.BestResultUpdateWithoutUserInput, Prisma.BestResultUncheckedUpdateWithoutUserInput>;
};
export type BestResultUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bestFrontendScore?: Prisma.IntFieldUpdateOperationsInput | number;
    bestBackendScore?: Prisma.IntFieldUpdateOperationsInput | number;
    bestMobileScore?: Prisma.IntFieldUpdateOperationsInput | number;
    totalScore?: Prisma.IntFieldUpdateOperationsInput | number;
    frontendAchievedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    backendAchievedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    mobileAchievedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BestResultUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bestFrontendScore?: Prisma.IntFieldUpdateOperationsInput | number;
    bestBackendScore?: Prisma.IntFieldUpdateOperationsInput | number;
    bestMobileScore?: Prisma.IntFieldUpdateOperationsInput | number;
    totalScore?: Prisma.IntFieldUpdateOperationsInput | number;
    frontendAchievedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    backendAchievedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    mobileAchievedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BestResultSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    bestFrontendScore?: boolean;
    bestBackendScore?: boolean;
    bestMobileScore?: boolean;
    totalScore?: boolean;
    frontendAchievedAt?: boolean;
    backendAchievedAt?: boolean;
    mobileAchievedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bestResult"]>;
export type BestResultSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    bestFrontendScore?: boolean;
    bestBackendScore?: boolean;
    bestMobileScore?: boolean;
    totalScore?: boolean;
    frontendAchievedAt?: boolean;
    backendAchievedAt?: boolean;
    mobileAchievedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bestResult"]>;
export type BestResultSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    bestFrontendScore?: boolean;
    bestBackendScore?: boolean;
    bestMobileScore?: boolean;
    totalScore?: boolean;
    frontendAchievedAt?: boolean;
    backendAchievedAt?: boolean;
    mobileAchievedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bestResult"]>;
export type BestResultSelectScalar = {
    id?: boolean;
    userId?: boolean;
    bestFrontendScore?: boolean;
    bestBackendScore?: boolean;
    bestMobileScore?: boolean;
    totalScore?: boolean;
    frontendAchievedAt?: boolean;
    backendAchievedAt?: boolean;
    mobileAchievedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BestResultOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "bestFrontendScore" | "bestBackendScore" | "bestMobileScore" | "totalScore" | "frontendAchievedAt" | "backendAchievedAt" | "mobileAchievedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["bestResult"]>;
export type BestResultInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type BestResultIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type BestResultIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $BestResultPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BestResult";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        bestFrontendScore: number;
        bestBackendScore: number;
        bestMobileScore: number;
        totalScore: number;
        frontendAchievedAt: Date | null;
        backendAchievedAt: Date | null;
        mobileAchievedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["bestResult"]>;
    composites: {};
};
export type BestResultGetPayload<S extends boolean | null | undefined | BestResultDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BestResultPayload, S>;
export type BestResultCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BestResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BestResultCountAggregateInputType | true;
};
export interface BestResultDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BestResult'];
        meta: {
            name: 'BestResult';
        };
    };
    findUnique<T extends BestResultFindUniqueArgs>(args: Prisma.SelectSubset<T, BestResultFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BestResultClient<runtime.Types.Result.GetResult<Prisma.$BestResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BestResultFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BestResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BestResultClient<runtime.Types.Result.GetResult<Prisma.$BestResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BestResultFindFirstArgs>(args?: Prisma.SelectSubset<T, BestResultFindFirstArgs<ExtArgs>>): Prisma.Prisma__BestResultClient<runtime.Types.Result.GetResult<Prisma.$BestResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BestResultFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BestResultFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BestResultClient<runtime.Types.Result.GetResult<Prisma.$BestResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BestResultFindManyArgs>(args?: Prisma.SelectSubset<T, BestResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BestResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BestResultCreateArgs>(args: Prisma.SelectSubset<T, BestResultCreateArgs<ExtArgs>>): Prisma.Prisma__BestResultClient<runtime.Types.Result.GetResult<Prisma.$BestResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BestResultCreateManyArgs>(args?: Prisma.SelectSubset<T, BestResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BestResultCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BestResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BestResultPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BestResultDeleteArgs>(args: Prisma.SelectSubset<T, BestResultDeleteArgs<ExtArgs>>): Prisma.Prisma__BestResultClient<runtime.Types.Result.GetResult<Prisma.$BestResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BestResultUpdateArgs>(args: Prisma.SelectSubset<T, BestResultUpdateArgs<ExtArgs>>): Prisma.Prisma__BestResultClient<runtime.Types.Result.GetResult<Prisma.$BestResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BestResultDeleteManyArgs>(args?: Prisma.SelectSubset<T, BestResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BestResultUpdateManyArgs>(args: Prisma.SelectSubset<T, BestResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BestResultUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BestResultUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BestResultPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BestResultUpsertArgs>(args: Prisma.SelectSubset<T, BestResultUpsertArgs<ExtArgs>>): Prisma.Prisma__BestResultClient<runtime.Types.Result.GetResult<Prisma.$BestResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BestResultCountArgs>(args?: Prisma.Subset<T, BestResultCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BestResultCountAggregateOutputType> : number>;
    aggregate<T extends BestResultAggregateArgs>(args: Prisma.Subset<T, BestResultAggregateArgs>): Prisma.PrismaPromise<GetBestResultAggregateType<T>>;
    groupBy<T extends BestResultGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BestResultGroupByArgs['orderBy'];
    } : {
        orderBy?: BestResultGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BestResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBestResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BestResultFieldRefs;
}
export interface Prisma__BestResultClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BestResultFieldRefs {
    readonly id: Prisma.FieldRef<"BestResult", 'String'>;
    readonly userId: Prisma.FieldRef<"BestResult", 'String'>;
    readonly bestFrontendScore: Prisma.FieldRef<"BestResult", 'Int'>;
    readonly bestBackendScore: Prisma.FieldRef<"BestResult", 'Int'>;
    readonly bestMobileScore: Prisma.FieldRef<"BestResult", 'Int'>;
    readonly totalScore: Prisma.FieldRef<"BestResult", 'Int'>;
    readonly frontendAchievedAt: Prisma.FieldRef<"BestResult", 'DateTime'>;
    readonly backendAchievedAt: Prisma.FieldRef<"BestResult", 'DateTime'>;
    readonly mobileAchievedAt: Prisma.FieldRef<"BestResult", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"BestResult", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"BestResult", 'DateTime'>;
}
export type BestResultFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BestResultSelect<ExtArgs> | null;
    omit?: Prisma.BestResultOmit<ExtArgs> | null;
    include?: Prisma.BestResultInclude<ExtArgs> | null;
    where: Prisma.BestResultWhereUniqueInput;
};
export type BestResultFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BestResultSelect<ExtArgs> | null;
    omit?: Prisma.BestResultOmit<ExtArgs> | null;
    include?: Prisma.BestResultInclude<ExtArgs> | null;
    where: Prisma.BestResultWhereUniqueInput;
};
export type BestResultFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BestResultSelect<ExtArgs> | null;
    omit?: Prisma.BestResultOmit<ExtArgs> | null;
    include?: Prisma.BestResultInclude<ExtArgs> | null;
    where?: Prisma.BestResultWhereInput;
    orderBy?: Prisma.BestResultOrderByWithRelationInput | Prisma.BestResultOrderByWithRelationInput[];
    cursor?: Prisma.BestResultWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BestResultScalarFieldEnum | Prisma.BestResultScalarFieldEnum[];
};
export type BestResultFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BestResultSelect<ExtArgs> | null;
    omit?: Prisma.BestResultOmit<ExtArgs> | null;
    include?: Prisma.BestResultInclude<ExtArgs> | null;
    where?: Prisma.BestResultWhereInput;
    orderBy?: Prisma.BestResultOrderByWithRelationInput | Prisma.BestResultOrderByWithRelationInput[];
    cursor?: Prisma.BestResultWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BestResultScalarFieldEnum | Prisma.BestResultScalarFieldEnum[];
};
export type BestResultFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BestResultSelect<ExtArgs> | null;
    omit?: Prisma.BestResultOmit<ExtArgs> | null;
    include?: Prisma.BestResultInclude<ExtArgs> | null;
    where?: Prisma.BestResultWhereInput;
    orderBy?: Prisma.BestResultOrderByWithRelationInput | Prisma.BestResultOrderByWithRelationInput[];
    cursor?: Prisma.BestResultWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BestResultScalarFieldEnum | Prisma.BestResultScalarFieldEnum[];
};
export type BestResultCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BestResultSelect<ExtArgs> | null;
    omit?: Prisma.BestResultOmit<ExtArgs> | null;
    include?: Prisma.BestResultInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BestResultCreateInput, Prisma.BestResultUncheckedCreateInput>;
};
export type BestResultCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BestResultCreateManyInput | Prisma.BestResultCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BestResultCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BestResultSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BestResultOmit<ExtArgs> | null;
    data: Prisma.BestResultCreateManyInput | Prisma.BestResultCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BestResultIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BestResultUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BestResultSelect<ExtArgs> | null;
    omit?: Prisma.BestResultOmit<ExtArgs> | null;
    include?: Prisma.BestResultInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BestResultUpdateInput, Prisma.BestResultUncheckedUpdateInput>;
    where: Prisma.BestResultWhereUniqueInput;
};
export type BestResultUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BestResultUpdateManyMutationInput, Prisma.BestResultUncheckedUpdateManyInput>;
    where?: Prisma.BestResultWhereInput;
    limit?: number;
};
export type BestResultUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BestResultSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BestResultOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BestResultUpdateManyMutationInput, Prisma.BestResultUncheckedUpdateManyInput>;
    where?: Prisma.BestResultWhereInput;
    limit?: number;
    include?: Prisma.BestResultIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BestResultUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BestResultSelect<ExtArgs> | null;
    omit?: Prisma.BestResultOmit<ExtArgs> | null;
    include?: Prisma.BestResultInclude<ExtArgs> | null;
    where: Prisma.BestResultWhereUniqueInput;
    create: Prisma.XOR<Prisma.BestResultCreateInput, Prisma.BestResultUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BestResultUpdateInput, Prisma.BestResultUncheckedUpdateInput>;
};
export type BestResultDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BestResultSelect<ExtArgs> | null;
    omit?: Prisma.BestResultOmit<ExtArgs> | null;
    include?: Prisma.BestResultInclude<ExtArgs> | null;
    where: Prisma.BestResultWhereUniqueInput;
};
export type BestResultDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BestResultWhereInput;
    limit?: number;
};
export type BestResultDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BestResultSelect<ExtArgs> | null;
    omit?: Prisma.BestResultOmit<ExtArgs> | null;
    include?: Prisma.BestResultInclude<ExtArgs> | null;
};
export {};
