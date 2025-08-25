import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import { MultipartFile } from '@adonisjs/bodyparser'

export class MediaUploaderService {
    private uploadDir = app.makePath('public/uploads/media')

    /**
     * Handle file upload
     */
    public async upload(file: MultipartFile) {
        if (!file) {
            throw new Error('No file provided')
        }

        if (!file.isValid) {
            throw new Error(JSON.stringify(file.errors))
        }

        // Generate unique filename
        const fileName = `${cuid()}.${file.extname}`

        // Move file to upload dir
        await file.move(this.uploadDir, {
            name: fileName,
            overwrite: false,
        })

        return {
            fileName,
            fileUrl: `/uploads/media/${fileName}`,
            ext: file.extname,
            size: file.size,
            type: file.type,
            subtype: file.subtype,
        }
    }
}
