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
                Create Skill
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="row mb-3">
                  <div class="col-12">
                    <label for="skillTitle" class="col-form-label">
                      Skill Title
                    </label>

                    <input type="text" id="skillTitle" class="form-control" />
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-12">
                    <label for="skillDescription" class="col-form-label">
                      Skill Description
                    </label>

                    <textarea id="skillDescription" class="form-control" />
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
