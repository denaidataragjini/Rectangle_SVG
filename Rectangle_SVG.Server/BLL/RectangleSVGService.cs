using Newtonsoft.Json;
using Rectangle_SVG.Server.DTO;

namespace Rectangle_SVG.Server.BLL;

public class RectangleSVGService : IRectangleSVGService
{
    private readonly string FilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data\\RectangleSVGData.json");
   
    
    public async Task<RectangleDTO> GetRectangleDataAsync()
    {
        string json = await ReadFromJsonFile();

        var deserializedData = JsonConvert.DeserializeObject<RectangleDTO>(json);

        return deserializedData!;
    }
    public async Task UpdateRectangleDataAsync(RectangleDTO model)
    {
        var serializedData = JsonConvert.SerializeObject(model);

        await WriteToJsonFile(serializedData);
    }

    #region Privates
    private async Task<string> ReadFromJsonFile()
    {
        if (!File.Exists(FilePath))
            throw new Exception("File not found!");

        else
            return await File.ReadAllTextAsync(FilePath);
    }

    private async Task WriteToJsonFile(string data)
    {
        if (!File.Exists(FilePath))
            await File.WriteAllTextAsync(FilePath, data);

        else
        {
            File.Delete(FilePath);
            await File.WriteAllTextAsync(FilePath, data);
        }
    }
    #endregion

}
