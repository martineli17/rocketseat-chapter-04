export interface ImagesQueryResponse {
    after?: {
        id: string;
    };
    data: ImagesQueryResponseData[];
}

export interface ImagesQueryResponseData {
    data: {
        title: string;
        description: string;
        url: string;
    };
    ts: number;
    ref: {
        id: string;
    };
}

export interface ImagesResponse {
    after?: string;
    data: ImagesResponseData[];
}

export interface ImagesResponseData {
    title: string;
    description: string;
    url: string;
    ts: number;
    id: string;
}