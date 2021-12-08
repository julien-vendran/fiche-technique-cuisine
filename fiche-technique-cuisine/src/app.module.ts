import { ConfigModule } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeModule } from './recipe/recipe.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { IngredientsCategorieModule } from './ingredients-categorie/ingredients-categorie.module';
import { AllergenModule } from './allergen/allergen.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './process.env',
    }),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false
      },
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // This for development
      autoLoadEntities: true
    }),
    RecipeModule,
    IngredientsModule,
    IngredientsCategorieModule,
    AllergenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
