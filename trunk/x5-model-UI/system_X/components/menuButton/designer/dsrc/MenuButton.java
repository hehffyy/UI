import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.justep.designer.components.OperationManager;
import com.justep.studio.data.DataRecord;
import com.justep.studio.ui.editors.xui.BaseComponent;
import com.justep.studio.ui.editors.xui.XuiDataModel;
import com.justep.studio.ui.editors.xui.XuiElement;


public class MenuButton extends BaseComponent {

	public Map newMenuItem(XuiElement currentE) {
		String elementName = "menuitem";
		XuiDataModel model = currentE.getXuiDataModel();
		XuiElement newE = model.addElement(elementName, currentE, null);
		newE.setPropertyValue("label", "menuitem"); 
		newE.setPropertyValue("name", newE.getProperyValue("id"));
		this.getDesigner().getEditorPart().getTreeViewer().refresh();
		return null;
	}
	
	@SuppressWarnings("rawtypes")
	public Map selectOperation(XuiElement xuiElement){
		List<String> excludeList = new ArrayList<String>();
		List<XuiElement> childList = xuiElement.getChildren();
		for(XuiElement childE:childList){
			XuiElement ownerCom = childE.getComponentDefine();
			if(ownerCom != null){
				childE = ownerCom;
			}
			String opOwner = childE.getProperyValue("operation-owner");
			String op = childE.getProperyValue("operation");
			if(opOwner!=null && !opOwner.equals("") && op!=null && !op.equals("")){
				excludeList.add(opOwner+"."+op);
			}
		}
		
		XuiDataModel model = xuiElement.getXuiDataModel();
		List<DataRecord> recordList = OperationManager.selectOperation(xuiElement,excludeList);
		if(recordList == null){
			return null;
		}
		for(DataRecord record:recordList){
			String owner = record.getString("owner");
			String name = record.getString("name");
			XuiElement menuitem = model.addElement("menuitem", xuiElement, null);
			menuitem.setPropertyValue("label", "");
			menuitem.setPropertyValue("operation-owner", owner);
			menuitem.setPropertyValue("operation", name);
			menuitem.setPropertyValue("name", menuitem.getId());
		}
 
		return null;
	}
}