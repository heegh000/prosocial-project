interface PostInfoType {
    postId : number;
    title : string;
    content : string;
    createdAt? : string;
    likeCnt : number;
    commentList : string[];
}

interface NewPostType {
    title : string;
    contnet : string;
}

export type {
    PostInfoType,
    NewPostType
}