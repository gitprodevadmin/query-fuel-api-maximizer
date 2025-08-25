import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import env from '#start/env'

export default class MediaController {
  public async upload({ request, response }: HttpContext) {
    const MAXIMIZER_API_BASE_URL = env.get('MAXIMIZER_API_BASE_URL')
    const MAXIMIZER_API_TOKEN = env.get('MAXIMIZER_API_TOKEN')

    try {
      const file = request.file('file', {
        size: '15mb',
        extnames: [
          // Images
          'jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'tif', 'webp', 'svg',
          'heic', 'heif',
          // Videos
          'mp4', 'mov', 'avi', 'mkv', 'flv', 'wmv', 'webm', 'mpeg', 'mpg', 'm4v', '3gp',
        ],
      })

      if (!file) {
        return response.badRequest({ error: 'File is required' })
      }
      if (!file.tmpPath) {
        return response.badRequest({ error: 'Could not access file temporary path' })
      }

      // ✅ Read file into buffer (instead of using stream)
      const fileBuffer = fs.readFileSync(file.tmpPath)

      const form = new FormData()

      form.append('file', fileBuffer, {
        filename: file.clientName,
        contentType: file.type,
      })

      const metadata = {
        title: file.clientName,
        type: file.type?.startsWith('video') ? 'video' : 'image',
        uploadedBy: 'adonis-app',
      }

      form.append('data', JSON.stringify(metadata))

      const apiResponse = await axios.post(
        `${MAXIMIZER_API_BASE_URL}/media`,
        form,
        {
          headers: {
            ...form.getHeaders(),
            Authorization: `Bearer ${MAXIMIZER_API_TOKEN}`,
          },
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
        }
      )

      return response.ok({
        message: 'File uploaded successfully',
        data: apiResponse.data,
      })
    } catch (err: any) {
      console.error(err?.response?.data || err.message)
      return response.status(400).send({
        error: err.response?.data || err.message,
      })
    }
  }
}
