import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    credentials: {
        accessKeyId: "d79f65b0dd91f86651d3a2dc49e0afc5",
        secretAccessKey: "a1721148e83f156dc8bfa015eff02343d7d1d0ba40377747cbbfa9277036a98f"
    },
    endpoint: "https://jevhdzsjeoykeblpcyph.supabase.co/storage/v1/s3",
    region: "ap-southeast-1",
    forcePathStyle: true
});

export default s3Client;