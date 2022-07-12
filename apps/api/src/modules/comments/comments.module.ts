import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, Comment } from './entities/comment.entity';
import { UsersModule } from '../users/users.module';
import { ExperimentsModule } from '../experiments/experiments.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comment.name,
        schema: CommentSchema,
      },
    ]),
    forwardRef(() => ExperimentsModule),
    forwardRef(() => UsersModule),
  ],
  providers: [CommentsResolver, CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
