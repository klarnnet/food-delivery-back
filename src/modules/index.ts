
import { AuthModule } from './auth/auth.module';
import { FavoriteModule } from './favorite/favorite.module';
import { FoodModule } from './food/food.module';
import { NotificationModule } from './notification/notification.module';
import { StripeModule } from './stripe/stripe.module';
import { UserHistoryModule } from './userHistory/userHistory.module';


export const APP_MODULES = [
   AuthModule,
   FoodModule,
   FavoriteModule,
   NotificationModule,
   UserHistoryModule,
   StripeModule
];
