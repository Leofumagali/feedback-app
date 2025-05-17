import {
  Card, CardBody, CardTitle, CardText, Button, Dropdown, DropdownToggle,
  DropdownMenu, DropdownItem, Badge
} from 'reactstrap';
import { useState } from 'react';
import { updateFeedbackStatus } from '../services/api';
import { FaBug, FaLightbulb, FaComment, FaTrash, FaChevronDown } from 'react-icons/fa';

const statusOptions = ['new', 'in_review', 'responded', 'closed'];
const statusLabels = {
  new: 'New',
  in_review: 'In Review',
  responded: 'Responded',
  closed: 'Closed'
};
const statusColor = {
  new: 'secondary',
  in_review: 'warning',
  responded: 'success',
  closed: 'dark'
};

const typeIcons = {
  'bug report': <FaBug className="me-1" />,
  'feature request': <FaLightbulb className="me-1" />,
  'other': <FaComment className="me-1" />
};

export const FeedbackCard = ({ id, name, email, type, status, comment, handleDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleStatusChange = async (newStatus) => {
    setCurrentStatus(newStatus);
    try {
      const token = localStorage.getItem('token');
      await updateFeedbackStatus(id, newStatus, token);
    } catch {
      alert('Failed to update status');
      setCurrentStatus(status);
    }
  };

  return (
    <Card className="mb-4 border-0 shadow-sm rounded-3 bg-white">
      <CardBody className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <CardTitle tag="h5" className="mb-1 fw-semibold text-dark">{name}</CardTitle>
            <small className="text-muted">{email}</small>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Badge color="info" pill className="text-capitalize px-3 py-2 d-flex align-items-center" style={{ fontSize: '0.875rem', height: '38px' }}>
              {typeIcons[type] || ''}{type.replace('_', ' ')}
            </Badge>

            <Dropdown 
              isOpen={dropdownOpen} 
              toggle={toggleDropdown}
              modifiers={{flip: {enabled: false}}}
            >
              <DropdownToggle
                color={statusColor[currentStatus] || 'light'}
                className="fw-semibold rounded-pill px-3 py-1"
                style={{ fontSize: '0.875rem', height: '38px' }}
              >
                {statusLabels[currentStatus]} 
                <FaChevronDown 
                  className={`ms-2 transition-chevron ${dropdownOpen ? 'rotate' : ''}`}
                />
              </DropdownToggle>
              <DropdownMenu
                className="manual-dropdown mt-2 shadow-sm rounded-3"
              >
                {statusOptions.map((opt) => (
                  <DropdownItem
                    key={opt}
                    onClick={() => handleStatusChange(opt)}
                    active={currentStatus === opt}
                    className="text-capitalize"
                  >
                    {statusLabels[opt]}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <CardText className="text-body mb-4" style={{ fontStyle: 'italic', fontSize: '1.05rem' }}>
          “{comment}”
        </CardText>

        <div className="d-flex justify-content-end">
          <Button color="outline-danger" size="sm" className="rounded-pill px-3 d-flex align-items-center gap-2" onClick={() => handleDelete(id)}>
            <FaTrash /> Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};