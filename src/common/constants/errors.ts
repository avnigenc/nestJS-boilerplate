import IErrorStandard from '../interfaces/error.interface';

const EXAMPLE_NOT_FOUND: IErrorStandard = {
  code: 1,
  error: 'EXAMPLE_NOT_FOUND_ERROR',
  message: 'example not found error',
};

const EXTERNAL_SERVICE_CALLER = (serviceName: string, error: string): IErrorStandard => ({
  code: 2,
  error: `external service caller error: ${serviceName}`,
  message: error,
});

const INVALID_OBJECT_ID: IErrorStandard = {
  code: 3,
  error: 'INVALID_OBJECT_ID_ERROR',
  message: 'invalid object id error',
};

export { EXAMPLE_NOT_FOUND, EXTERNAL_SERVICE_CALLER, INVALID_OBJECT_ID };
