import { container } from 'tsyringe';

import IStoragePRovider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStoragePRovider>(
  'StorageProvider',
  DiskStorageProvider,
);
