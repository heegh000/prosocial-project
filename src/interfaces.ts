interface PostInfoType {
    postId : number;
    title : string;
    content : string;
    createdAt? : string;
    likeCnt : number;
}

interface NewPostType {
    title : string;
    contnet : string;
}

export type {
    PostInfoType,
    NewPostType
}