using Core.Entities;

public class Pagination
{
    public int PageIndex { get; set; }
    public int PageSize { get; set; }
    public int Count { get; set; }
    public IEnumerable<Contact> Data { get; set; }

    public Pagination(int pageIndex, int pageSize, int count, IEnumerable<Contact> data)
    {
        PageIndex = pageIndex;
        PageSize = pageSize;
        Count = count;
        Data = data;
    }
}