import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CommentsModule } from './comments/comments.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [CommentsModule]
})
export class PostsModule {}
