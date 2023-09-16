import ytdl from 'ytdl-core'
import fs from 'fs'

export const download = (videoId) => {
    const videoURL = "https://youtube.com/shorts/" + videoId
    console.log("download:", videoId)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
        .on("info", (info) => {
            const seconds = info.formats[0].approxDurationMs / 1000

            if (seconds > 60) {
                throw new Error("A duração desse vídeo é maior do que 60 segundos.")
            }
        })
        .on("end", () => {
            console.log("Download do vídeo finalizado.")
        })
        .on("error", (error) => {
            const newLocal = "Não "
        console.log("Não foi possível fazer o download do vídeo. Detalhes do erro:", error)
        })
        .pipe(fs.createWriteStream("./tmp/audio.mp4"))
}