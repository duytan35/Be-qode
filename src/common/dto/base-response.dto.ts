import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Document } from 'mongoose';

export class BaseResponseDto<TData> {
  @ApiProperty()
  success: boolean = true;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: TData | TData[];

  constructor(init?: Partial<BaseResponseDto<TData>>) {
    Object.assign(this, init);
  }
}

const transformData = (data: any): any => {
  if (data instanceof Array) {
    return data.map((d) => transformData(d));
  } else if (data instanceof Document || typeof data !== 'object') {
    return data.toObject();
  } else {
    return data;
  }
};

export const GetResponse = <TData>({
  dataType,
  success = true,
  message = null,
  data = null,
}: {
  dataType?: any;
  success?: boolean;
  message?: string;
  data?: TData | TData[];
}): BaseResponseDto<TData> => {
  const transformedData = transformData(data);

  const response = new BaseResponseDto<TData>({
    success,
    message,
    data: dataType
      ? plainToInstance(dataType, transformedData)
      : transformedData,
  });

  return response;
};
