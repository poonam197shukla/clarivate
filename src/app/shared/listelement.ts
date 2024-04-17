//return from API is in ListElement format.

export interface ListElement {
    albumId:number;
    id:number;
    title:string;
    url:string;
    thumbnailUrl:string;
    checked?:boolean;
}
