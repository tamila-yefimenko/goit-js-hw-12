import axios from "axios";
import "pace-js";
import "../css/animations.css";

export const itemsPerPage = 40;
const instance = axios.create({
    baseURL: 'https://pixabay.com',
    });
export async function requestData(inputValue, pageNumber) {
    
    try {
        Pace.start();
        const response = await instance.get("/api/", {
            params: {
                key: "48823669-6a3dc21720ce29a0e321c0b37",
                q: inputValue,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: "true",
                page: pageNumber,
                per_page: itemsPerPage,
            } 
        });
        return response.data;
    } catch (error) {
        console.log(error);
    } finally {
        Pace.stop();
    }
};