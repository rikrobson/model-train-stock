compartments
  .filter(c => c.layer_number === layer)
  .forEach(c => {
    const cell = document.createElement('div');
    cell.className = 'border p-1 text-center position-relative';
    cell.style.height = '100px';
    cell.style.overflow = 'hidden';
    cell.style.cursor = 'pointer';
    cell.style.display = 'flex';
    cell.style.flexDirection = 'column';
    cell.style.alignItems = 'center';
    cell.style.justifyContent = 'center';

    if (c.StockItems && c.StockItems.length > 0) {
      // Show thumbnails
      const thumbRow = document.createElement('div');
      thumbRow.style.display = 'flex';
      thumbRow.style.gap = '2px';

      c.StockItems.forEach(stock => {
        const img = document.createElement('img');
        img.src = stock.image_path;
        img.alt = stock.name;
        img.style.maxHeight = '40px';
        img.style.maxWidth = '40px';
        img.style.objectFit = 'contain';
        img.style.border = '1px solid #ccc';
        img.style.borderRadius = '3px';
        thumbRow.appendChild(img);

        img.onclick = (e) => {
          e.stopPropagation(); // prevent triggering compartment click
          showStockDetails(stock);
        };
      });

      cell.appendChild(thumbRow);

      // Occupancy badge
      const badge = document.createElement('div');
      badge.textContent = `${c.StockItems.length}/3`;
      badge.className = 'badge bg-secondary position-absolute top-0 end-0 m-1';
      cell.appendChild(badge);

      // Clicking the cell shows all items in modal
      cell.onclick = () => showCompartmentDetails(c);
    } else {
      cell.textContent = 'Empty';
      cell.style.color = '#aaa';
    }

    grid.appendChild(cell);
  });