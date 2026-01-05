using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemGroupsController : ControllerBase
    {
        private readonly IItemGroupService _itemGroupService;

        public ItemGroupsController(IItemGroupService itemGroupService)
        {
            _itemGroupService = itemGroupService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemGroupDto>> GetItemGroup(Guid id)
        {
            var group = await _itemGroupService.GetItemGroupByIdAsync(id);
            if (group == null) return NotFound();
            return group;
        }

        [Authorize(Roles = "Employee, Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemGroupDto>>> GetItemGroups([FromQuery] string? searchTerm, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var groups = await _itemGroupService.GetGroupItemsPagedAndSortedAsync(searchTerm, pageNumber, pageSize);
            return Ok(groups);
        }

        [HttpPost]
        public async Task<ActionResult> CreateItemGroup(ItemGroupDto dto)
        {
            await _itemGroupService.CreateItemGroupAsync(dto);
            return CreatedAtAction(nameof(GetItemGroup), new { id = dto.ItemGroupId }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItemGroup(Guid id, ItemGroupDto dto)
        {
            var result = await _itemGroupService.UpdateItemGroupAsync(id, dto);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemGroup(Guid id)
        {
            await _itemGroupService.DeleteItemGroupAsync(id);
            return NoContent();
        }
    }
}
