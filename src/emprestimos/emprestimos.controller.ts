import { Controller, Get, Post, Body, Param, Put, UsePipes, ValidationPipe, ParseIntPipe, HttpCode, Delete } from '@nestjs/common';
import { EmprestimosService } from './emprestimos.service';
import { CreateEmprestimoDTO } from './dtos/create-emprestimo.dto';

@Controller('emprestimos')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class EmprestimosController {
  constructor(private readonly service: EmprestimosService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateEmprestimoDTO) {
    return this.service.create(dto);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Put(':id/devolucao')
  async devolucao(
    @Param('id', ParseIntPipe) id: number,
    @Body('dataDevolucao') dataDevolucao: string,
  ) {
    return this.service.devolucao(id, dataDevolucao);
  }

  @Get('usuario/:idUsuario')
  async byUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.service.findByUsuario(idUsuario);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.remove(id);
  }
}
