import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CustomConfigModule } from './common/configuration/config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './modules/category/category.module';
import { LocationsModule } from './modules/location/location.module';
import { UsersModule } from './modules/user/user.module';
import { MapsModule } from './modules/map/map.module';
import { ProductModule } from './modules/products/product.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/jwt-auth.guard';
import { ReportsModule } from './modules/report/report.module';
import { InvoiceModule } from './modules/invoices/invoice.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    AuthModule,
    InvoiceModule,
    ReportsModule,
    ProductModule,
    DatabaseModule,
    CustomConfigModule,
    CategoryModule,
    LocationsModule,
    LocationsModule,
    UsersModule,
    MapsModule,
  ],
  providers: [JwtService],
})
export class AppModule {}
