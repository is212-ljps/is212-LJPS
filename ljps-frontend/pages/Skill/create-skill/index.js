export default function CreateSkill() {
  return (
    <div>
      <div class="row">
        <div class="col-12 d-flex flex-row-reverse">
          <button
            type="button"
            class="btn btn-light"
            data-bs-toggle="modal"
            data-bs-target="#createSkillModal"
          >
            Create Skill <i class="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>

      <div
        class="modal fade"
        id="createSkillModal"
        tabindex="-1"
        aria-labelledby="createSkillModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createSkillModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
