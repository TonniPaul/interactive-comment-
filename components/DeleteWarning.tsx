import { DeleteWarningProps } from "@/interface/interfaces";
import { DeleteWarningStyle } from "@/styles/main.styled";

export default function DeleteWarning({
  onCancel,
  onDelete,
}: DeleteWarningProps) {
  return (
    <DeleteWarningStyle>
      <div>
        <div>
          <h4>Delete comment</h4>
          <p>
            {
              "Are you sure you want to delete this comment? This will remove the comment and can't be undone."
            }
          </p>
        </div>
        <div>
          <button
            onClick={onCancel}
            className="bg-Grayish-Blue px-8 py-3 rounded-lg hover:opacity-50"
          >
            NO, CANCEL
          </button>
          <button
            onClick={onDelete}
            className="bg-Soft-Red px-8 py-3 rounded-lg hover:opacity-50"
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </DeleteWarningStyle>
  );
}
