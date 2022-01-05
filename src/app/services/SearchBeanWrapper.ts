import { SearchBean } from "./SearchBean";

export interface SearchBeanWrapper{

    searchResult: SearchBean[];
    totalRecords: number;
	pageindex: number;
    

}