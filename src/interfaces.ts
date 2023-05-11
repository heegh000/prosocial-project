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

interface NewCommentType {
    content : string;
    post_id : number;
}

export type {
    PostInfoType,
    NewPostType,
    NewCommentType
}