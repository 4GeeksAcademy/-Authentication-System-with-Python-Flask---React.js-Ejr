<div class="selector mx-3 mb-3">
  <label for="formFileMultiple" className="form-label">
    Multiple files input example
  </label>
  <input
    className="form-control"
    type="file"
    id="formFileMultiple"
    multiple
    onChange={(e) => {
      setImageSelected(e.target.files[0]);
    }}
  />
</div>;
