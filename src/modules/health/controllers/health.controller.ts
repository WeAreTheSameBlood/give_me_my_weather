import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('health')
export class HealthController {
  // MARK: - GET - Health Check
  @Get()
  @HttpCode(HttpStatus.OK)
  async healtCheck(): Promise<{ status: string }> {
    const status: string = 'Server is working!!! ᕙ(  •̀ ᗜ •́  )ᕗ';
    console.log(status);
    return { status };
  }
}