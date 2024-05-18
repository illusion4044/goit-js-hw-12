export const createGalleryItemMarkup = images => {
    return images
      .map(
        ({ webformatURL, largeImageURL, tags, likes }) => `
          <div class="col gallery-item">
            <div class="card shadow-sm">
              <a href="${largeImageURL}" class="gallery-link">
                <img src="${webformatURL}" alt="${tags}" class="gallery-img img-fluid" />
              </a>
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                  </div>
                  <small class="text-body-secondary">Likes: ${likes}</small>
                </div>
              </div>
            </div>
          </div>`
      )
      .join('');
  };
  