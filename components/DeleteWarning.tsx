import { DeleteWarningProps } from "@/interface/interfaces";
import { DeleteWarningStyle } from "@/styles/main.styled";

export default function DeleteWarning({ onCancel, onConfirm }: DeleteWarningProps) {
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
          <button onClick={onCancel}>NO, CANCEL</button>
          <button onClick={onConfirm}>YES, DELETE</button>
        </div>
      </div>
    </DeleteWarningStyle>
  );
}
