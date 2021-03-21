import { Prisma } from ".prisma/client";

const processHashtag = (caption: string): any => {
  const hashtags = caption.match(/#[\w]+/g) || [];
  return hashtags.map((hashtag: String) => ({
    where: { hashtag },
    create: { hashtag },
  }));
};

export default processHashtag;
