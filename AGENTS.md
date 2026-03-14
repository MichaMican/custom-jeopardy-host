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

## Pause on Buzz for Action Components

When implementing a new question type that has an **action component** — any interactive or animated element controlled from the host remote (e.g. audio playback, image mozaik reveal, video playback, timer countdown) — you **must** integrate with the "Pause actions on buzz" feature.

The `GameState` includes a `PauseOnBuzz` boolean. When this flag is `true` and a player buzzes in, the `BuzzIn` method in `GameService` must automatically pause every active action component. Currently this covers:
- `MediaPlaying` → set to `false` (audio playback)
- `MozaikRevealing` → set to `false` (image mozaik unveiling)

If you add a new action component, update the `BuzzIn` method in `CustomQuizHost.Server/Services/Game.cs` to also set that component's state to its paused/stopped value inside the `if (_gameState.PauseOnBuzz)` block.
