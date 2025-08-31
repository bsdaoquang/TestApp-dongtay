export enum TINHTRANGID {
  ChoDuyet = 'ChoDuyet',
  KhoiTao = 'KhoiTao',
  DaDuyet = 'DaDuyet',
}

export enum TENTINHTRANG {
  ChoDuyet = 'CHỜ DUYỆT',
  KhoiTao = 'KHỞI TẠO',
  DaDuyet = 'ĐÃ DUYỆT',
}

export interface PaymentModel {
  id: string;
  DUANID: string;
  NGAYCHUNGTU: string;
  LOAINXID: string;
  TINHTRANGID: TINHTRANGID;
  PHIEUID: string;
  HOPDONGID: string;
  TIENLAMTRON: number;
  LOAIPHIEUID: string;
  TENTINHTRANG: TENTINHTRANG;
  TENKH: string;
  STT: string;
}
