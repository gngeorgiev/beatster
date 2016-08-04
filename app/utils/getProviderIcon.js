export default function (provider) {
    switch (provider.toLowerCase()) {
        case 'youtube': return 'youtube-play';
        case 'soundcloud': return 'soundcloud';
    }
}