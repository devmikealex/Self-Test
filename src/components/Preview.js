export default function Preview(props) {
    if (props.url.includes('www.youtube.com/watch?v=')) {
        const videoID = props.url.replace("https://www.youtube.com/watch?v=", "")
        // const iframeYouTube = `<iframe width="444" height="250" src="https://www.youtube.com/embed/${videoID}" title="YouTube video player" frameborder="0" allowfullscreen></iframe>`
        // return <div dangerouslySetInnerHTML={{__html: iframeYouTube}} />
        const previewImage = `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`
        return <img src={previewImage} alt="YouTube preview"/>
    }
    return null
}

// How do I get a YouTube video thumbnail from the YouTube API? - Stack Overflow
// https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api