export default function ProfileAvatar({ url, size = 24, isActive }) {
    return (
        <img
            src={url}
            alt="avatar"
            style={{
                width: size,
                height: size,
                objectFit: "cover",
                borderRadius: "50%",
            }}
        />
    );
}
