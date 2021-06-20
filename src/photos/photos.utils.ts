const processHashtag = (caption: string): any => {
  const hashtags = caption.match(/#[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+/g);
  return hashtags.map((hashtag: String) => ({
    where: { hashtag },
    create: { hashtag },
  }));
};

export default processHashtag;
