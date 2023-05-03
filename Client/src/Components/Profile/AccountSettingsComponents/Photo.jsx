const Photo = ({ previewPhoto, handlePhotoChange }) => {
    return (
      <div className="position-relative">
        <img
          src={`${previewPhoto}`}
          alt="User"
          className="img-thumbnail rounded-circle"
          style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
        />
        <div className="position-absolute top-0 end-0">
          <label htmlFor="user-photo-input" className="btn btn-secondary btn-sm">
            Change Photo
          </label>
          <input
            id="user-photo-input"
            type="file"
            className="d-none"
            name="userPhoto"
            onChange={handlePhotoChange}
            accept="image/*"
          />
        </div>
      </div>
    );
  };
  export default Photo;