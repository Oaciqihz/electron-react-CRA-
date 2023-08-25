import serviceAxios from "./index";

export const translate = (data) => {
    return serviceAxios({
        url: `/translator/translate`,
        method: "post",
        data
    })
}