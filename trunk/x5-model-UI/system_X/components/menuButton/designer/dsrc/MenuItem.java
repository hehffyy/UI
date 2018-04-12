import java.util.Map;

import com.justep.studio.ui.editors.xui.OperationCallerComponent;
import com.justep.studio.ui.editors.xui.XuiElement;


public class MenuItem extends OperationCallerComponent {
	
	public Map moveUp(XuiElement currentE) {
		currentE.getParentElement().moveChild(currentE, currentE.getPrevSiblingElement());
		refreshNavTree(currentE.getParentElement());
		return null;
	}

	public Map moveDown(XuiElement currentE) {
		XuiElement nextE = currentE.getNextSiblingElement();
		if(nextE != null){
			currentE.getParentElement().moveChild(nextE, currentE);
		} 
		refreshNavTree(currentE.getParentElement());
		return null;
	}
	
	private void refreshNavTree(XuiElement parent){
		this.getDesigner().getEditorPart().getTreePanel().getTreeViewer().refresh(parent);
	}
}
