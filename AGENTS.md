# AGENTS.md

## Upload Progress Bars

Always use the `UploadProgressModal` component (located at `customquizhost.client/src/components/UploadProgressModal.tsx`) when implementing user-facing file uploads. This ensures the user can see upload progress transparently.

Use the `uploadFileWithProgress` utility (located at `customquizhost.client/src/utils/uploadWithProgress.ts`) for making upload requests with progress tracking.

### Usage pattern

```tsx
import UploadProgressModal from "../components/UploadProgressModal";
import { uploadFileWithProgress } from "../utils/uploadWithProgress";

// State
const [uploading, setUploading] = useState(false);
const [uploadProgress, setUploadProgress] = useState(0);
const [uploadMessage, setUploadMessage] = useState("");

// Upload call
setUploading(true);
setUploadProgress(0);
setUploadMessage("Uploading file…");
const data = await uploadFileWithProgress(file, (percent) => setUploadProgress(percent));
setUploading(false);

// JSX
<UploadProgressModal visible={uploading} progress={uploadProgress} message={uploadMessage} />
```
