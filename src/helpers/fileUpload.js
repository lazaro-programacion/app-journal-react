

export const fileUpload = async (file) => {
    const clowUrle = 'https://api.cloudinary.com/v1_1/daskxrut3/upload'

    const formData = new FormData()
    formData.append('upload_preset', 'react-journal')
    formData.append('file', file)

    try {
        const resp = await fetch(clowUrle, {
            method: 'POST',
            body: formData
        })

        if (resp.ok) {
            const cloudResp = await resp.json()
            return cloudResp.secure_url
        } else {
            throw await resp.json()
        }
    } catch (error) {
        console.log(error)
        throw error
    }


}