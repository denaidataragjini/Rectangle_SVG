using Rectangle_SVG.Server.DTO;

namespace Rectangle_SVG.Server.BLL;

public interface IRectangleSVGService
{
    Task<RectangleDTO> GetRectangleDataAsync();
    Task UpdateRectangleDataAsync(RectangleDTO model);
}
