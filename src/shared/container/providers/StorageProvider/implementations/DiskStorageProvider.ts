import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

import IStoragePRovider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

class DiskStorageProvider implements IStoragePRovider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    const userAvatarFileExists = await fs.promises.stat(filePath);

    if (userAvatarFileExists) {
      await fs.promises.unlink(filePath);
    }
  }
}

export default DiskStorageProvider;
