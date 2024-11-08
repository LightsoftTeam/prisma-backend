import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsUUID, ValidateNested } from "class-validator";
import { CashFlowType } from "src/domain/entities";
import { PaymentItemDto } from "src/movements/dto/payment-item.dto";

export class CreateCashBoxMovementDto{
    @ApiProperty({
        description: 'Type of cash flow',
        example: CashFlowType.INCOME,
        enum: CashFlowType
    })
    @IsEnum(CashFlowType)
    type: CashFlowType;

    @ApiProperty({
        description: 'Payment concept id',
        example: 'f7b1f1b0-0b1b-4b7b-8b1b-0b1b1b1b1b1b'
    })
    @IsUUID()
    paymentConceptId: string;

    @ApiProperty({
        description: 'Remarks of the movement',
        example: 'Payment of the sale'
    })
    remarks?: string;

    @ApiProperty({
        description: 'Items',
    })
    @IsArray()
    @Type(() => PaymentItemDto)
    @ValidateNested({
        each: true,
    })
    items: PaymentItemDto[];

    @ApiProperty({
        description: 'Total',
        example: 100
    })
    @IsNumber()
    total: number;
}