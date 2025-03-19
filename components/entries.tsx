import { useState } from "react";

interface EntryReviewProps {
    entry: string;
    onReject: () => void;
    onEdit: (oldEntry: string, newEntry: string) => void;
}

export const EntryReview: React.FC<EntryReviewProps> = ({ entry, onReject, onEdit }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedEntry, setEditedEntry] = useState<string>(entry);

    const handleSave = () => {
        onEdit(entry, editedEntry);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedEntry(entry);
        setIsEditing(false);
    };

    return (
        <div className="flex items-center gap-4 p-4 border rounded-md w-full max-w-4xl">
            {isEditing ? (
                <div className="flex-grow flex gap-2">
                    <input
                        type="text"
                        value={editedEntry}
                        onChange={(e) => setEditedEntry(e.target.value)}
                        className="flex-grow px-2 py-1 border rounded-md"
                        autoFocus
                    />
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <>
                    <p className="flex-grow">{entry}</p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Edit
                    </button>
                </>
            )}
            <button
                onClick={onReject}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
                Remove
            </button>
        </div>
    );
};
