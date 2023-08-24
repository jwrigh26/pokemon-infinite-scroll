import { palette } from 'assets/colorPalette';

const ColorPalette = () => {
  const renderCustomScale = (customScale) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 80px)',
        gap: '10px',
      }}
    >
      {Object.keys(customScale).map((customKey) => (
        <div
          key={customKey}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: customScale[customKey],
              border: '1px solid #000',
            }}
          ></div>
          <small style={{ textAlign: 'center', maxWidth: '60px' }}>
            {customKey}
          </small>
        </div>
      ))}
    </div>
  );

  const renderColors = () => {
    return Object.keys(palette).map((key) => (
      <div key={key} style={{ marginBottom: '20px' }}>
        <h3 style={{ textAlign: 'left' }}>{key}</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 80px)',
            gap: '10px',
          }}
        >
          {Object.keys(palette[key]).map(
            (subKey) =>
              subKey !== 'customScale' && (
                <div
                  key={subKey}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: palette[key][subKey],
                      border: '1px solid #000',
                    }}
                  ></div>
                  <small style={{ textAlign: 'center', maxWidth: '60px' }}>
                    {subKey}
                  </small>
                </div>
              )
          )}
        </div>
        {palette[key].customScale && (
          <>
            <h4 style={{ textAlign: 'left' }}>Custom Scale</h4>
            {renderCustomScale(palette[key].customScale)}
          </>
        )}
      </div>
    ));
  };

  return (
    <div>
      <h1>Color Palette</h1>
      {renderColors()}
    </div>
  );
};

export default ColorPalette;