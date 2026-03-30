import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { CustomConfigModule } from "./common/configuration/config.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CategoryModule } from "./modules/category/category.module";
import { LocationsModule } from "./modules/location/location.module";
import { UsersModule } from "./modules/user/user.module";
import { MapsModule } from "./modules/map/map.module";
import { ProductModule } from "./modules/products/product.module";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { AuthGuard } from "./common/guards/jwt-auth.guard";
import { ReportsModule } from "./modules/report/report.module";
import { InvoiceModule } from "./modules/invoices/invoice.module";
import { AuthModule } from "./modules/auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { TransformInterceptor } from "./common/interceptors/http.interceptor";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { ThrottlerModule } from "@nestjs/throttler";
import { UsersGateway } from "./websocket/users.gateway";
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
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 3,
        },
      ],
    }),
  ],
  providers: [
    JwtService,
    UsersGateway,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
